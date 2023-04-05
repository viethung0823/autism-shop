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
import * as dayjs from "dayjs";

export const DetailTable = (props) => {
  const { data = {} } = props;

  const commissionData = data.map(({ note }) => {
    const match = note.match(/(\d+)(?:\.\d+)?(k)?/);
    if (match) {
      const [, num, k] = match;
      return k ? parseInt(num.replace(/,/g, ""), 10) * 1000 : parseInt(num.replace(/,/g, ""), 10);
    }
    return 0;
  });

  const total = commissionData.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ngày giờ</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>SĐT</TableCell>
                <TableCell>Đơn hàng</TableCell>
                <TableCell>Phí giao hàng</TableCell>
                <TableCell>Tổng cộng</TableCell>
                <TableCell>Hoa hồng</TableCell>
                <TableCell>Ghi chú</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => {
                return (
                  <>
                    <TableRow hover key={index}>
                      <TableCell>{dayjs(item.created_at).format("DD-MM-YYYY")}</TableCell>
                      <TableCell>{item.buyer_info.name}</TableCell>
                      <TableCell>
                        {item.buyer_info.phone_number.replace(/^\+84(\d{9})$/, "0$1")}
                      </TableCell>
                      <TableCell>
                        {item.ordered_grand_total.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </TableCell>
                      <TableCell>
                        {item.delivery_fee.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </TableCell>
                      <TableCell>
                        {item.grand_total.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </TableCell>
                      <TableCell>
                        {commissionData[index].toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </TableCell>
                      <TableCell>{item.note}</TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Số đơn: {data.length}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Typography color="HighlightText" fontWeight="bold">
                    {total.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
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
