import { useState, useEffect, useMemo } from 'react';
import postData from '../../posts/posts';
import PostGrid from '../../components/PostGrid';
import Pagination from '../../components/Pagination';
import './PostSection.css';

const PostSection = () => {
  const [posts, setPosts] = useState([]);
  const [tagsSorted, setTagsSorted] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);
  const [postsSelected, setPostsSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const pageCount = Math.ceil(postsSelected.length / postsPerPage);

  useEffect(() => {
    const loadedLatestPost = postData.sort((a, b) => b.id - a.id);
    const newTagsToPost = categorizePostsByTags(loadedLatestPost);

    // Sort tags by their frequency
    const sortedTags = Object.keys(newTagsToPost)
      .map(tag => {
        return {
          name: tag,
          frequency: newTagsToPost[tag].length
        };
      })
      .sort((a, b) => b.frequency - a.frequency);

    setPosts(loadedLatestPost);
    setTagsSorted(sortedTags);
    setPostsSelected(loadedLatestPost);
  }, []);

  const categorizePostsByTags = posts => {
    const tagsToPostsMap = {};
    posts.forEach(post => {
      post.tags.forEach(tag => {
        if (tagsToPostsMap[tag]) {
          tagsToPostsMap[tag].push(post.id);
        } else {
          tagsToPostsMap[tag] = [post.id];
        }
      });
    });
    return tagsToPostsMap;
  };

  const selectTag = tagName => {
    const index = tagsSelected.indexOf(tagName);
    if (index !== -1) {
      // Deselect: remove the tag if the tag is already in it
      const newTagsSelected = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(newTagsSelected);
      updatePostsSelected(newTagsSelected);
    } else {
      // Select: add to the array if new selected tag is not already in it
      const newTagsSelected = [...tagsSelected, tagName];
      setTagsSelected(newTagsSelected);
      updatePostsSelected(newTagsSelected);
    }
  };

  const updatePostsSelected = selectedTags => {
    // Reset: display all posts and tags counts if no select
    if (selectedTags.length === 0) {
      setPostsSelected(posts);
      setTagsSorted(
        tagsSorted.map(tag => ({
          ...tag,
          frequency: posts.filter(post => post.tags.includes(tag.name)).length
        }))
      );
      return;
    }

    const filteredSelectedPosts = posts.filter(post => {
      const postsIncludeTags = tag => post.tags.includes(tag);
      return selectedTags.every(postsIncludeTags);
    });

    setPostsSelected(filteredSelectedPosts);
    updateSelectedTagCounts(filteredSelectedPosts);
  };

  const updateSelectedTagCounts = filteredSelectedPosts => {
    const tagCountsArray = tagsSorted.map(tag => {
      const newFrequency = filteredSelectedPosts.filter(post =>
        post.tags.includes(tag.name)
      ).length;

      const newCounts = {
        ...tag,
        frequency: newFrequency
      };

      return newCounts;
    });
    setTagsSorted(tagCountsArray);
  };

  const changePage = index => {
    setCurrentPage(index);
  };

  // Slicing operation is only performed pagination data changes.
  const currentPosts = useMemo(() => {
    const firstPostIndex = (currentPage - 1) * postsPerPage;
    const lastPostIndex = firstPostIndex + postsPerPage;
    return postsSelected.slice(firstPostIndex, lastPostIndex);
  }, [currentPage, postsSelected, postsPerPage]);

  return (
    <div className="relative post-section-board min-h-screen">
      <div
        className="
          text-center
          post-section-text-title
          my-14 
          font-mono 
          text-2xl 
          sm:text-3xl 
          md:text-4xl 
          lg:text-5xl 
          xl:text-6xl 
          disable-select
        "
      >
        THINGS I FIND USEFUL
      </div>
      <div className="text-center mb-8 disable-select">
        {tagsSorted.map(tag => (
          <button
            key={tag.name}
            disabled={tag.frequency === 0}
            onClick={() => selectTag(tag.name)}
            className={`
              border-2
              font-mono
              px-2
              py-1
              rounded-lg
              shadow-lg
              mb-2
              mx-2
              text-xs
              sm:text-xs
              md:text-sm
              lg:text-lg
              xl:text-lg
              hover-bg 
              hover-text
              hover:scale-110
              hover:shadow-2xl
            hover:shadow-stone-700/50 
              hover:-translate-y-1
            disabled:border-gray-500
            disabled:text-gray-500
              disabled:hover:scale-100
              disabled:transition-none
              disabled:hover:shadow-none
              disabled:hover:bg-inherit
              disabled:hover:transform-none
            active:bg-gray-900 
            active:text-gray-200
              transition
              duration-300
              whitespace-pre
              ${tagsSelected.includes(tag.name) ? 'text-selected border-selected' : 'text-zinc-400 border-zinc-500'}
            `}
          >
            {tag.name + '  ' + tag.frequency}
          </button>
        ))}
      </div>
      {currentPosts.map(post => (
        <PostGrid key={post.id} title={post.title} tags={post.tags} />
      ))}
      <div
        className="
          absolute
          bottom-1
          mb-1
          mt-10
          left-1/2
          -translate-x-1/2
          disable-select
        "
      >
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default PostSection;
