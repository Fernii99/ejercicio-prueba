import React from 'react'

export const CommentCard = ({comentario}) => {
    const { user, comment_text, created_at } = comentario;
  
    return (
        <div style={{display: 'flex', flexDirection: 'row', width: '40%', textAlign: 'left', gap: 50}} >
            <p > User: {user} <br/>
            Comment: "{comment_text}" <br/>
            posted: "{created_at}"
            </p>
        </div>
    )
}
