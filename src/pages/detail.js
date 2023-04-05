import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { DetailTable } from "src/sections/customer/detail-table";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import { useRouter } from "next/router";

const Page = (props) => {
  const router = useRouter();
  const customers = JSON.parse(router.query.customers);
  const name = router.query.name;
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
              <Typography variant="h4">Cộng tác viên {name.toLocaleLowerCase()}</Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Button
                  fullWidth
                  color="inherit"
                  size="medium"
                  type="button"
                  variant="text"
                  href="/customers"
                  startIcon={<SvgIcon fontSize="small">{<ChevronLeftIcon />}</SvgIcon>}
                >
                  Back
                </Button>
                <Button
                  fullWidth
                  color="inherit"
                  variant="text"
                  startIcon={<SvgIcon fontSize="small">{<ArrowDownOnSquareIcon />}</SvgIcon>}
                >
                  Download
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <DetailTable data={customers} />
        </Stack>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
