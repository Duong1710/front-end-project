import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <Container className="admin-dashboard mt-4">
            <h2 className="text-center mb-4">Quản Trị Hệ Thống</h2>
            <Row className="justify-content-center">
                <Col md={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="text-center">
                            <Card.Title>Quản Lý Người Dùng</Card.Title>
                            <Card.Text>
                                Xem và quản lý thông tin người dùng trong hệ thống
                            </Card.Text>
                            <Link to="/system/user-manage">
                                <Button variant="primary">Truy cập</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-4">
                    <Card className="h-100">
                        <Card.Body className="text-center">
                            <Card.Title>Quản Lý Trận Đấu</Card.Title>
                            <Card.Text>
                                Quản lý thông tin và lịch trình các trận đấu
                            </Card.Text>
                            <Button variant="primary" disabled>
                                Sắp ra mắt
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminDashboard; 