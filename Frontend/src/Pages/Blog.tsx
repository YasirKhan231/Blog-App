
import {useParams} from "react-router-dom";
import { useBlog } from "../Hooks";
import { Appbar } from "../Components/AppBar";
import { Spinner } from "../Components/Spinner";
import { FullBlog } from "../Components/FullBlog";

// atomFamilies/selectorFamilies
export const Blog = () => {
    const { id } = useParams();
    const {loading, blog} = useBlog({
        id: id || ""
    });

    if (loading || !blog) {
        return <div>
            <Appbar />
        
            <div className="h-screen flex flex-col justify-center">
                
                <div className="flex justify-center">
                    <Spinner />
                </div>
            </div>
        </div>
    }
    return <div>
        <FullBlog blog={blog} />
    </div>
}