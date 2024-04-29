import { useParams, Link } from 'react-router-dom';
import './Post.css';

const Post = () => {
  const { title } = useParams();
  return (
    <div>
      <div className="relative w-4/5 sm:w-4/5 md:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto py-20">
        <div className="font-mono text-post text-5xl text-center pb-10 px-2 leading-tight">
          {title}
        </div>
      </div>
      <Link to="/">
        <div
          className="
            fixed
            bottom-5
            left-1/2
            -translate-x-1/2
            text-home
            font-mono
            border-2
          border-zinc-500
            rounded-lg
            text-lg
            py-2
            px-5
            transfrom
            duration-500
          hover:bg-gray-900/70
            hover:shadow-xl
            hover:scale-105
            hover-border-home
            disable-select
          "
        >
          HOME
        </div>
      </Link>
    </div>
  );
};

export default Post;
