import React, { useState, useEffect } from "react";
import { Card, Col, Row, Space, Typography } from "antd";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import request from "~/utils/request";
import { formatGiaTienVND } from "~/utils/formatResponse";
import TableSoLuongTon from "./TableSoLuongTon";
import TableThongKeDoanhThu from "./TableThongKeDoanhThu";

const { Text } = Typography;
const { RangePicker } = DatePicker;

const ThongKe: React.FC = () => {
  const [thongKeNgay, setThongKeNgay] = useState(null);
  const [thongKeTuan, setThongKeTuan] = useState(null);
  const [thongKeThang, setThongKeThang] = useState(null);
  const [thongKeNam, setThongKeNam] = useState(null);
  const [thongKeKhoangNgay, setThongKeKhoangNgay] = useState(null);

  const onChangeNgay: DatePickerProps["onChange"] = (date) => {
    getThongKeNgay(date);
  };

  const onChangeTuan: DatePickerProps["onChange"] = (date) => {
    getThongKeTuan(date);
  };

  const onChangeThang: DatePickerProps["onChange"] = (date) => {
    getThongKeThang(date);
  };

  const onChangeNam: DatePickerProps["onChange"] = (date) => {
    getThongKeNam(date);
  };

  const onChangeKhoangNgay: DatePickerProps["onChange"] = (date) => {
    getThongKeKhoangNgay(date);
  };

  const getThongKeNgay = async (date) => {
    try {
      const res = await request.get("thong-ke/ngay", {
        params: { ngay: date.format("YYYY-MM-DD") },
      });
      setThongKeNgay(res.data);
    } catch (e) {
      console.log("lỗi");
    }
  };

  const getThongKeTuan = async (date) => {
    const startOfWeek = date.startOf("week").format("YYYY-MM-DD");
    const endOfWeek = date.endOf("week").format("YYYY-MM-DD");

    const tuan = {
      startOfWeek: startOfWeek,
      endOfWeek: endOfWeek,
    };

    try {
      const res = await request.get("thong-ke/tuan", {
        params: tuan,
      });
      setThongKeTuan(res.data);
      console.log(res);
    } catch (e) {
      console.log("lỗi");
    }
  };

  const getThongKeThang = async (date) => {
    const startOfMonth = date.startOf("month").format("YYYY-MM-DD");
    const endOfMonth = date.endOf("month").format("YYYY-MM-DD");

    const thang = {
      startOfMonth: startOfMonth,
      endOfMonth: endOfMonth,
    };

    try {
      const res = await request.get("thong-ke/thang", {
        params: thang,
      });
      setThongKeThang(res.data);
      console.log(res);
    } catch (e) {
      console.log("lỗi");
    }
  };

  const getThongKeNam = async (date) => {
    const startOfYear = date.startOf("year").format("YYYY-MM-DD");
    const endOfYear = date.endOf("year").format("YYYY-MM-DD");

    const nam = {
      startOfYear: startOfYear,
      endOfYear: endOfYear,
    };

    try {
      const res = await request.get("thong-ke/nam", {
        params: nam,
      });
      setThongKeNam(res.data);
      console.log(res);
    } catch (e) {
      console.log("lỗi");
    }
  };

  const getThongKeKhoangNgay = async (date) => {
    if (date && date.length === 2) {
      const start = date[0].format("YYYY-MM-DD");
      const end = date[1].format("YYYY-MM-DD");

      const khoangNgay = {
        start: start,
        end: end,
      };

      try {
        const res = await request.get("thong-ke/khoang-ngay", {
          params: khoangNgay,
        });
        setThongKeKhoangNgay(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu thống kê theo khoảng ngày:", error);
      }
    }
  };

  useEffect(() => {
    getThongKeNgay(dayjs());
    getThongKeTuan(dayjs());
    getThongKeThang(dayjs());
    getThongKeNam(dayjs());
  }, []);

  return (
    <>
      <Row>
        <Col span={5} style={{ marginLeft: 50, marginRight: 30 }}>
          <Card
            hoverable
            style={{
              width: "auto",
              height: "auto",
              position: "relative",
            }}
            title={"Ngày"}
          >
            <div style={{ position: "absolute", top: 13, right: 10 }}>
              <DatePicker
                allowClear={false}
                format={"DD-MM-YYYY"}
                onChange={onChangeNgay}
                defaultValue={dayjs()}
              />
            </div>
            <Space>
              Tổng doanh thu:
              <Text strong>
                {formatGiaTienVND(
                  thongKeNgay !== null ? thongKeNgay.tongDoanhThu : 0
                )}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn thành công:
              <Text strong>
                {thongKeNgay !== null ? thongKeNgay.tongSoDonThanhCong : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn hủy:
              <Text strong>
                {thongKeNgay !== null ? thongKeNgay.tongSoDonHuy : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số sản phẩm đã bán:
              <Text strong>
                {thongKeNgay !== null ? thongKeNgay.tongSoSanPhamDaBan : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn Tại quầy:
              <Text strong>
                {thongKeNgay !== null ? thongKeNgay.tongSoDonTaiQuay : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn Online:
              <Text strong>
                {thongKeNgay !== null ? thongKeNgay.tongSoDonOnline : 0}
              </Text>
            </Space>
          </Card>
        </Col>
        <Col span={5} style={{ marginRight: 30 }}>
          <Card
            hoverable
            style={{ width: "auto", height: "auto", position: "relative" }}
            title={"Tuần"}
          >
            <div style={{ position: "absolute", top: 13, right: 10 }}>
              <DatePicker
                allowClear={false}
                style={{ width: 120 }}
                onChange={onChangeTuan}
                defaultValue={dayjs().endOf("week")}
                picker="week"
              />
            </div>
            <Space>
              Tổng doanh thu:
              <Text strong>
                {formatGiaTienVND(
                  thongKeTuan !== null ? thongKeTuan.tongDoanhThu : 0
                )}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn thành công:
              <Text strong>
                {thongKeTuan !== null ? thongKeTuan.tongSoDonThanhCong : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn hủy:
              <Text strong>
                {thongKeTuan !== null ? thongKeTuan.tongSoDonHuy : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số sản phẩm đã bán:
              <Text strong>
                {thongKeTuan !== null ? thongKeTuan.tongSoSanPhamDaBan : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn Tại quầy:
              <Text strong>
                {thongKeTuan !== null ? thongKeTuan.tongSoDonTaiQuay : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn Online:
              <Text strong>
                {thongKeTuan !== null ? thongKeTuan.tongSoDonOnline : 0}
              </Text>
            </Space>
          </Card>
        </Col>
        <Col span={5} style={{ marginRight: 30 }}>
          <Card
            hoverable
            style={{ width: "auto", height: "auto", position: "relative" }}
            title={"Tháng"}
          >
            <div style={{ position: "absolute", top: 13, right: 10 }}>
              <DatePicker
                allowClear={false}
                style={{ width: 110 }}
                onChange={onChangeThang}
                picker="month"
                defaultValue={dayjs().endOf("month")}
                format={"MM-YYYY"}
              />
            </div>
            <Space>
              Tổng doanh thu:
              <Text strong>
                {formatGiaTienVND(
                  thongKeThang !== null ? thongKeThang.tongDoanhThu : 0
                )}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn thành công:
              <Text strong>
                {thongKeThang !== null ? thongKeThang.tongSoDonThanhCong : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn hủy:
              <Text strong>
                {thongKeThang !== null ? thongKeThang.tongSoDonHuy : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số sản phẩm đã bán:
              <Text strong>
                {thongKeThang !== null ? thongKeThang.tongSoSanPhamDaBan : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn Tại quầy:
              <Text strong>
                {thongKeThang !== null ? thongKeThang.tongSoDonTaiQuay : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn Online:
              <Text strong>
                {thongKeThang !== null ? thongKeThang.tongSoDonOnline : 0}
              </Text>
            </Space>
          </Card>
        </Col>
        <Col span={5}>
          <Card
            hoverable
            style={{ width: "auto", height: "auto", position: "relative" }}
            title={"Năm"}
          >
            <div style={{ position: "absolute", top: 13, right: 10 }}>
              <DatePicker
                allowClear={false}
                style={{ width: 80 }}
                onChange={onChangeNam}
                picker="year"
                defaultValue={dayjs().endOf("year")}
              />
            </div>
            <Space>
              Tổng doanh thu:
              <Text strong>
                {formatGiaTienVND(
                  thongKeNam !== null ? thongKeNam.tongDoanhThu : 0
                )}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn thành công:
              <Text strong>
                {thongKeNam !== null ? thongKeNam.tongSoDonThanhCong : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn hủy:
              <Text strong>
                {thongKeNam !== null ? thongKeNam.tongSoDonHuy : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số sản phẩm đã bán:
              <Text strong>
                {thongKeNam !== null ? thongKeNam.tongSoSanPhamDaBan : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn Tại quầy:
              <Text strong>
                {thongKeNam !== null ? thongKeNam.tongSoDonTaiQuay : 0}
              </Text>
            </Space>
            <br />
            <Space>
              Tổng số đơn Online:
              <Text strong>
                {thongKeNam !== null ? thongKeNam.tongSoDonOnline : 0}
              </Text>
            </Space>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col
          style={{
            marginLeft: 50,
            marginRight: 70,
            marginTop: 30,
            width: "100%",
          }}
        >
          <Card
            title={"Theo khoảng ngày"}
            hoverable
            style={{ width: "auto", height: "auto", position: "relative" }}
          >
            <div style={{ position: "absolute", top: 13, right: 10 }}>
              <RangePicker
                allowClear={false}
                style={{ width: "auto" }}
                onChange={onChangeKhoangNgay}
              />
            </div>
            <Row>
              <Col span={4}>
                <Space>
                  Tổng doanh thu:
                  <Text strong>
                    {formatGiaTienVND(
                      thongKeKhoangNgay !== null
                        ? thongKeKhoangNgay.tongDoanhThu
                        : 0
                    )}
                  </Text>
                </Space>
              </Col>
              <Col span={4}>
                <Space>
                  Tổng số đơn thành công:
                  <Text strong>
                    {thongKeKhoangNgay !== null
                      ? thongKeKhoangNgay.tongSoDonThanhCong
                      : 0}
                  </Text>
                </Space>
              </Col>
              <Col span={3}>
                <Space>
                  Tổng số đơn hủy:
                  <Text strong>
                    {thongKeKhoangNgay !== null
                      ? thongKeKhoangNgay.tongSoDonHuy
                      : 0}
                  </Text>
                </Space>
              </Col>
              <Col span={5}>
                <Space>
                  Tổng số sản phẩm đã bán:
                  <Text strong>
                    {thongKeKhoangNgay !== null
                      ? thongKeKhoangNgay.tongSoSanPhamDaBan
                      : 0}
                  </Text>
                </Space>
              </Col>
              <Col span={4}>
                <Space>
                  Tổng số đơn Tại quầy:
                  <Text strong>
                    {thongKeKhoangNgay !== null
                      ? thongKeKhoangNgay.tongSoDonTaiQuay
                      : 0}
                  </Text>
                </Space>
              </Col>
              <Col span={4}>
                <Space>
                  Tổng số đơn Online:
                  <Text strong>
                    {thongKeKhoangNgay !== null
                      ? thongKeKhoangNgay.tongSoDonOnline
                      : 0}
                  </Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <TableSoLuongTon />
      <TableThongKeDoanhThu />
    </>
  );
};

export default ThongKe;
