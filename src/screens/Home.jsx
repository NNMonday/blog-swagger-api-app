import React, { useEffect, useState } from 'react'
import { useAuth } from '../components/contexts/AuthContext'
import { Button, Col, Container, Row } from 'react-bootstrap'
import useTagApi from '../components/api/TagApi'
import Feed from '../components/Feed'
import LoadingIndicator from '../components/LoadingIndicator'

export default function Home() {
    document.title = 'Home -- Conduit'
    const { currentUser } = useAuth()
    const [feedStatus, setFeedStatus] = useState(currentUser ? 'your' : 'global')

    const resetFeedStatus = (status) => {
        setFeedStatus(status)
        setCurrentTag('')
    }

    const [currentTag, setCurrentTag] = useState('')
    const [tags, setTags] = useState([])
    const { getTag } = useTagApi()
    useEffect(() => {
        try {
            (async function () {
                const res = await getTag()
                setTags(res.data.tags)
            })()
        } catch (err) {
            console.log(err);
        }
    }, [getTag])

    const handleTag = (t) => {
        resetFeedStatus()
        setCurrentTag(t);
        setFeedStatus(t)
    }

    return (
        <>
            {!currentUser &&
                <Row>
                    <Col xs={12} className='text-center text-white py-5' style={{ backgroundColor: '#5CB85C' }}>
                        <h1 style={{ fontSize: '60px' }}>conduit</h1>
                        <h2 className='fw-lighter'>A place to share your knowledge</h2>
                    </Col>
                </Row>
            }
            <Container fluid className='mt-5' style={{ padding: '0 11%' }}>
                <Row>
                    <Col md={9} >
                        <Feed
                            currentTag={currentTag}
                            handleTag={handleTag}
                            feedStatus={feedStatus}
                            resetFeedStatus={resetFeedStatus}
                            type='home' />
                    </Col>
                    <Col md={3} style={{ marginBottom: '100px' }}>
                        <div className='p-3' style={{ backgroundColor: '#f3f3f3' }}>
                            <p>Popular Tags</p>
                            {tags.length > 0 ?
                                tags.map((t, i) => {
                                    return (
                                        <Button size='sm' className='popular-tag' key={i} onClick={() => handleTag(t)}>
                                            {t}
                                        </Button>
                                    )
                                })
                                :
                                <>
                                    <LoadingIndicator />
                                </>}
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
