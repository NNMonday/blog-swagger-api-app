import React from 'react'
import { Button } from 'react-bootstrap'
import useProfileApi from './api/ProfileApi'

export default function FollowBtn({ author, loading, setLoading, setArticle = () => { }, setThisProfile = () => { } }) {
  const { handleFollow: handleFollowApi } = useProfileApi()
  const handleFollow = async () => {
    try {
      setLoading(true)
      const res = await handleFollowApi(author)
      setThisProfile(res.data.profile)
      setArticle(prevArticle => ({
        ...prevArticle,
        author: {
          ...res.data.profile
        }
      }));
    } catch (err) {
      console.log(err);
    }
    setLoading(false)
  }

  return (
    <Button className={author.following ? 'edit follow' : 'edit'} size='sm' onClick={handleFollow} disabled={loading} style={{ marginRight: '10px' }}>
      {!author.following
        ?
        <><i className="fa-solid fa-plus"></i> Follow {author.username}</>
        :
        <><i className="fa-solid fa-x"></i> Unfollow {author.username}</>
      }
    </Button>
  )
}
