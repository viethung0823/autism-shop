import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import axios from "axios";

const apiInfo = {
  apiUrl: "https://api.finan.cc/finan-order/api/v3/get-list-order",
  businessId: "de1b98fb-8d50-45b6-98ea-3e753ddde0f2",
  state: "",
  search: "",
  page: 0,
  size: 0,
  dateFrom: "2023-03-31T17:00:00.000Z",
  dateTo: "2023-04-30T16:59:00.000Z",
  sort: "created_at desc",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZpY2VfaWQiOiIxOTU3MzkzMC04MjMxLTRiZDMtYWFlNi1lYWEzYjAwOWY4MjciLCJidXNpbmVzc19pZCI6IjkzY2YyNDY4LTAxZmYtNGM0MC05NzM0LTU5ZTgwMTBiMGU1MiIsInBlcm1pc3Npb25fa2V5cyI6InNob3Bfb3duZXIiLCJyZWZyZXNoX3Rva2VuX2lkIjoiZjU2NGY0M2EtMTc3Yi00ZjQxLTlkNTctODI0NmUwMmFjYjFmIiwic2VjdXJpdHlfcm9sZXMiOjIsImFwcF92ZXJzaW9uIjoiIiwidXNlcl9pZCI6IjEzZDVjNTE0LTdlOGYtNDk0ZC04ZGMyLWVlNTc4YWRmZTA3OSIsImV4cCI6MTY4MjgzMzI5NSwiaXNzIjoicHJvX3dlYiIsInN1YiI6IjEzZDVjNTE0LTdlOGYtNDk0ZC04ZGMyLWVlNTc4YWRmZTA3OXwxOTU3MzkzMC04MjMxLTRiZDMtYWFlNi1lYWEzYjAwOWY4Mjd8MTk1NzM5MzAtODIzMS00YmQzLWFhZTYtZWFhM2IwMDlmODI3In0.MS9S87PykIeiklvVUx8LAgcSP1nBzpwOBf_e9dki4kY",
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const fetchData = async () => {
    const { apiUrl, businessId, state, search, page, size, dateFrom, dateTo, sort, token } =
      apiInfo;
    try {
      const response = await axios.get(apiUrl, {
        params: {
          business_id: businessId,
          state,
          search,
          page,
          size,
          date_from: dateFrom,
          date_to: dateTo,
          sort,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTotalCustomer(response.data.data.length);
      const newData = response.data.data.reduce((accumulator, item, id) => {
        const matchName = item.buyer_info.name.match(/\(?([aA]\d+)\)?/);
        const matchNote = item.note.match(/\(?([aA]\d+)\)?/);
        const identifier = matchName ? matchName[1] : matchNote ? matchNote[1] : "";
        let existingData;
        if (identifier) {
          existingData = accumulator[identifier] ?? [];
          accumulator[identifier] = existingData;
        } else {
          existingData = accumulator["Chưa phân loại"] ?? [];
          accumulator["Chưa phân loại"] = existingData;
        }
        existingData.push(item);
        return accumulator;
      }, {});

      setData(newData);
    } catch (err) {
      setError(err.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Cộng tác viên</Typography>
            </Stack>
          </Stack>
          <CustomersSearch />
          <CustomersTable data={data} totalCustomer={totalCustomer} />
        </Stack>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
