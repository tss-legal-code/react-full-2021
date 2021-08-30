import { useMemo } from "react"

export const useSortedPosts = (postList, sort) => {
    const sortedPosts = useMemo(
        () => {
          if (sort) {
            return [...postList].
              sort(
                (a, b) =>
                  a[sort].
                    localeCompare(
                      b[sort]
                    )
              )
          }
          return postList
        },
        [sort, postList])

    return sortedPosts
} 

export const usePosts = (postList, sort, query) => {
    const sortedPosts = useSortedPosts(postList, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
        )
      }, [query, sortedPosts])
    
      return sortedAndSearchedPosts

}