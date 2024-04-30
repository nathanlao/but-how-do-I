import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import request from 'umi-request';
import './Post.css';

const Post = () => {
  const { title } = useParams();

  const [rawHTMLContent, setRawHTMLContent] = useState('');

  const fetchHTMLContent = async title => {
    const encodedTitle = encodeURIComponent(title);
    const url = `https://raw.githubusercontent.com/nathanlao/but-how-do-I/master/src/posts/${encodedTitle}.html`;

    try {
      const response = await request(url, {
        method: 'get',
        responseType: 'text'
      });
      return response;
    } catch (error) {
      console.error('Error fetching the HTML content:', error);
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      const HTMLContent = await fetchHTMLContent(title);
      setRawHTMLContent(HTMLContent);
    };
    fetchContent();
  }, [title]);

  return (
    <div>
      <div className="relative w-4/5 sm:w-4/5 md:w-4/5 lg:w-3/5 xl:w-1/2 mx-auto py-20">
        <div className="font-mono text-post text-5xl text-center pb-10 px-2 leading-tight">
          {title}
        </div>
        <div
          className="px-2"
          dangerouslySetInnerHTML={{ __html: rawHTMLContent }}
        />
      </div>
      <Link to="/but-how-do-I/">
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
