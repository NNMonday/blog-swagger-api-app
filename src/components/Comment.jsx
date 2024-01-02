import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'
import { Link } from 'react-router-dom'
import { convertDate } from './AuthorInfo'
import useCommentApi from './api/CommentApi'

export default function Comment({ type, slug, comment = {}, setCommentsList = {} }) {
    const { currentUser } = useAuth()
    const [newComment, setNewComment] = useState('')
    const [loadingAddBtn, setLoadingAddBtn] = useState(false)

    const { addComment: addCommentApi, deleteComment: deleteCommentApi } = useCommentApi()
    const addComment = async () => {
        try {
            setLoadingAddBtn(true)
            const res = await addCommentApi(newComment, slug);
            setNewComment('')
            setCommentsList(preList => [...preList, res.data.comment])
        } catch (err) {
            console.log(err);
        }
        setLoadingAddBtn(false)
    }

    const [loadingDel, setLoadingDel] = useState(false)
    const deleteComment = async () => {
        try {
            setLoadingDel(true)
            await deleteCommentApi(slug, comment.id)
            setCommentsList(preList => preList.filter(c => c.id !== comment.id))
        } catch (err) {
            console.log(err);
        }
        setLoadingDel(false)
    }

    return type === 'add'
        ?
        (
            <div className='pt-5' style={{ minWidth: '700px' }}>
                <Form>
                    <Form.Control className='p-3 comment-input' as={'textarea'} rows={3} placeholder='Write a comment...' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <div className='p-3' style={{ backgroundColor: '#f5f5f5', borderRadius: '0 0 6px 6px' }}>
                        <img src={currentUser.image} alt="" style={{ maxWidth: '30px', borderRadius: '50%' }} />
                        <Button disabled={loadingAddBtn} size='sm' className='add-comment' onClick={addComment}>
                            Post comment
                        </Button>
                    </div>
                </Form>
            </div>
        )
        :
        (
            <div className='pt-3' style={{ minWidth: '700px' }}>
                <Card>
                    <Card.Body>
                        {comment.body}
                    </Card.Body>
                    <Card.Footer className='p-3 d-flex justify-content-between' style={{ backgroundColor: '#f5f5f5', borderRadius: '0 0 6px 6px' }}>
                        <div className='d-flex align-items-center'>
                            <div className='d-flex align-items-center'>
                                <img src={currentUser.image} alt="" style={{ maxWidth: '18px', borderRadius: '50%' }} />
                            </div>
                            <Link to={`/@${comment.author.username}`} style={{ fontSize: 'smaller', textDecoration: 'none', color: '#5CB85C', margin: '0 10px' }}>{comment.author.username}</Link>
                            <span className='date'>{convertDate(comment.createdAt)}</span>
                        </div>
                        {currentUser.username === comment.author.username &&
                            <div>
                                <Button disabled={loadingDel} size='sm' onClick={deleteComment} style={{ backgroundColor: 'transparent', border: 'none', float: 'right' }}>
                                    <i className="fa-solid fa-trash" style={{ color: '#333' }}></i>
                                </Button>
                            </div>}
                    </Card.Footer>
                </Card>
            </div>
        )
}
