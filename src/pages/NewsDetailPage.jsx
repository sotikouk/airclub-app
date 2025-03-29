import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Breadcrumb } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsById } from '../store/slices/newsSlice';
import { FaCalendarAlt, FaUser, FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';

const NewsDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentNews, isLoading, error } = useSelector((state) => state.news);

    useEffect(() => {
        if (id) {
            dispatch(fetchNewsById(id));
        }
    }, [dispatch, id]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <Container className="py-5">
                <Row>
                    <Col>
                        <Card className="text-center p-5">
                            <Card.Body>
                                <h3 className="text-danger mb-3">Error Loading News</h3>
                                <p>{error}</p>
                                <Button variant="primary" onClick={() => navigate('/news')}>
                                    Back to News
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    if (!currentNews) {
        return (
            <Container className="py-5">
                <Row>
                    <Col>
                        <Card className="text-center p-5">
                            <Card.Body>
                                <h3 className="mb-3">News Article Not Found</h3>
                                <p>The news article you're looking for doesn't exist or has been removed.</p>
                                <Button variant="primary" onClick={() => navigate('/news')}>
                                    Back to News
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Row className="mb-3">
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
                            Home
                        </Breadcrumb.Item>
                        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/news' }}>
                            News
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{currentNews.title}</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Card className="border-0 shadow-sm">
                        {currentNews.imageUrl && (
                            <div className="position-relative">
                                <Card.Img
                                    variant="top"
                                    src={currentNews.imageUrl}
                                    alt={currentNews.title}
                                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                                />
                            </div>
                        )}
                        <Card.Body className="p-4">
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                className="mb-3"
                                onClick={() => navigate('/news')}
                            >
                                <FaArrowLeft className="me-2" /> Back to News
                            </Button>

                            <h1 className="mb-3">{currentNews.title}</h1>

                            <div className="d-flex flex-wrap text-muted mb-4">
                                <div className="me-4 mb-2 d-flex align-items-center">
                                    <FaCalendarAlt className="me-2" />
                                    {formatDate(currentNews.publicationDate)}
                                </div>
                                <div className="mb-2 d-flex align-items-center">
                                    <FaUser className="me-2" />
                                    {currentNews.author?.firstName} {currentNews.author?.lastName}
                                </div>
                            </div>

                            <div className="news-content mb-4">
                                {/* Split content into paragraphs */}
                                {currentNews.content.split('\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>

                            <hr className="my-4" />

                            <div className="d-flex justify-content-between align-items-center">
                                <Button
                                    variant="outline-primary"
                                    onClick={() => navigate('/news')}
                                >
                                    <FaArrowLeft className="me-2" /> Back to News
                                </Button>

                                <div className="d-flex gap-2">
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => {
                                            navigator.share({
                                                title: currentNews.title,
                                                text: currentNews.content.substring(0, 100) + '...',
                                                url: window.location.href,
                                            }).catch(err => console.log('Error sharing:', err));
                                        }}
                                    >
                                        Share
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Related News Section - You can implement this if needed */}
            {/* <Row className="mt-5">
        <Col>
          <h3 className="mb-4">Related News</h3>
          <RelatedNewsComponent newsId={id} />
        </Col>
      </Row> */}
        </Container>
    );
};

export default NewsDetailPage;