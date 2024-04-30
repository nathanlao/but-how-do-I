import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import './PostGrid.css';

const PostGrid = ({ title, tags }) => {
  const sortedTags = useMemo(() => {
    return tags.sort((a, b) => a.localeCompare(b));
  }, [tags]);

  return (
    <Link to={`/but-how-do-I/post/${title}`}>
      <div
        className="
          w-4/5 
          mx-auto 
          rounded-lg 
          shadow-inner 
          border-2 
          mb-5 
          transition 
          duration-300 
          hover:scale-102
          post-grid
          post-grid-border
        border-zinc-500
        "
      >
        <div
          className="
          post-grid-text
          text-xl
          font-mono
          sm:text-xl
          md:text-2xl
          lg:text-3xl
          xl:text-3xl
          break-words
          px-5
          py-7
          disable-select
        "
        >
          {title}
        </div>
        <div
          className="
          flex
          flex-wrap
          gap-2
          py-6
          px-3
          text-xs
          sm:text-xs
          md:text-sm
          lg:text-lg
          xl:text-lg
          font-mono
          overflow-hidden
        "
        >
          {sortedTags.map(tag => (
            <div
              key={tag}
              className="
                border-2
                rounded-md
                px-3
                py-1
                mx-2
                post-grid-text
                float-right
                disable-select
              "
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PostGrid;
