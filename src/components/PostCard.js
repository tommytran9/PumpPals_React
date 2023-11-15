function PostCard({ post }) {
    const { pfp, author, date, message, liked } = post;

    return (
        <div>
            {pfp}
            {author}
            {date}
            {message}
            {liked}
        </div>
    )
}
