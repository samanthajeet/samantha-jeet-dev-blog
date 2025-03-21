import Container from "@/components/Container";
import PostList from "@/components/PostList";

export default function AltHome({ posts }) {
    return (
        <>
            <Container>
                <div className="grid">
                    {posts.slice(0, 1).map(post => (
                        <PostList
                            key={post._id}
                            post={post}
                            minimal={true}
                            aspect="landscape"
                            fontWeight="large"
                            preloadImage={true}
                        />
                    ))}
                </div>
                <div className="grid gap-10 mt-20 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 ">
                    {posts.slice(1).map(post => (
                        <PostList key={post._id} post={post} aspect="square" />
                    ))}
                </div>
            </Container>
        </>
    );
}
