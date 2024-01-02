import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../components/contexts/AuthContext'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import useProfileApi from '../components/api/ProfileApi'
import FollowBtn from '../components/FollowBtn'
import Feed from '../components/Feed'
import LoadingIndicator from '../components/LoadingIndicator'
export default function Profile({ feedStatus }) {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [thisProfile, setThisProfile] = useState(null)
  const { username } = useParams()
  document.title = `${username} -- Conduit`
  const profileUsername = useMemo(() => username.substring(1, username.length), [username]);

  const { getProfile } = useProfileApi()
  useEffect(() => {
    (async function () {
      try {
        const res = await getProfile(profileUsername);
        setThisProfile(res.data.profile);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [profileUsername, getProfile]);

  const [loading, setLoading] = useState(false)

  return thisProfile ?
    <Container fluid className='p-0' style={{ marginBottom: '100px' }}>
      <Row style={{ backgroundColor: '#f3f3f3' }} className='pb-3'>
        <Col xs={12} className='text-center'>
          <div style={{ height: '130px' }} className='mt-4'>
            <img className='rounded-circle' src={thisProfile.image} alt="" style={{ height: '100%' }} />
          </div>
          <p className='fw-bold my-3 fs-3'>{thisProfile.username}</p>
          <p>{thisProfile.bio}</p>
        </Col>
        <Col xs={12} className='d-flex justify-content-end' style={{ paddingRight: '11%' }}>
          {currentUser && currentUser.username === profileUsername
            ?
            <Button className='edit' size='sm' onClick={() => {
              navigate('/settings')
            }}>
              <i className="fa-solid fa-gear"></i>
              <span style={{ marginLeft: '10px' }}>Edit Profile Settings</span>
            </Button>
            :
            <FollowBtn
              author={thisProfile}
              loading={loading}
              setLoading={setLoading}
              setThisProfile={setThisProfile} />
          }
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Container className='mt-5' style={{ maxWidth: '1000px', padding: '0 11%' }}>
            <Feed
              feedStatus={feedStatus}
              thisProfileUsername={thisProfile.username}
              type='profile'
            />
          </Container>
        </Col>
      </Row>
    </Container>
    :
    <LoadingIndicator />
}
