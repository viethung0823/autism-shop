import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { useRouter } from "next/router";

export const CustomersTable = (props) => {
  const { data = {}, totalCustomer = 0 } = props;
  const router = useRouter();
  let totalCommission = 0;

  const handleViewDetails = (name, customers) => {
    router.push({
      pathname: "/detail",
      query: { customers: JSON.stringify(customers), name },
    });
  };

  const commissionData = (list) => {
    const value = list
      .map(({ note }) => {
        const match = note.match(/(?:\d*[1-9]\d*)(k)?/);
        if (match) {
          const [, k] = match;
          return k
            ? parseInt(match[0].replace(/,/g, ""), 10) * 1000
            : parseInt(match[0].replace(/,/g, ""), 10);
        }
        return 0;
      })
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    totalCommission += value;
    return value;
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>CTV</TableCell>
                <TableCell>Lượng khách hàng</TableCell>
                <TableCell>Hoa hồng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data).map((item, index) => {
                return (
                  <>
                    <TableRow
                      hover
                      key={item.id}
                      onClick={() => handleViewDetails(item, Object.values(data)[index])}
                    >
                      <TableCell>{item}</TableCell>
                      <TableCell>{Object.values(data)[index].length}</TableCell>
                      <TableCell>
                        {commissionData(Object.values(data)[index]).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>SL: {Object.keys(data).length}</TableCell>
                <TableCell>SL: {totalCustomer}</TableCell>
                <TableCell>
                  <Typography color="HighlightText" fontWeight="bold">
                    Tổng cộng:{" "}
                    {totalCommission.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );
};
