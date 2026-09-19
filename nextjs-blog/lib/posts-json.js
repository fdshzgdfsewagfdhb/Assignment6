//imports
import fs from 'fs';
import path from 'path';
// this is the path to the data folder
const dataDir = path.join(process.cwd(), 'data');

// this function gathers data from the posts.json file in a callable way
// to be fair gemma3 wrote this function but i refactord the rest myself
// and now looking at it, im embarrassed that i didnt write this myself
// i should have tried to logic it out myself, but i was in solve the problem mode 
// not, you know, learning mode, so just pretend this isnt here
export const loadPostsData = () => {
    const filePath = path.join(dataDir, 'posts.json');
    const jsonString = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(jsonString);
};
// this function gets, sorts and returns the data from the posts.json 
// it returns the posts id, title, and date, sorted by title
export function getSortedPostsData() {
    const jsonObj = loadPostsData();
    jsonObj.sort(function(a, b) {
        return a.title.localeCompare(b.title);
    });
    return jsonObj.map(item => {
        return {
          id: item.id.toString(),
          title: item.title,
          date: item.date
        }
      });

}
// this function gets and returns the ID from a post posts.json
// so that other components know what the ID is for each post, and can use it to get the data for that post
export function getAllPostIds() {
    const jsonObj = loadPostsData();
    return jsonObj.map(item => {
        return {
          params: {
            id: item.id.toString()
          }
        }
      });
}
// this function gets an Id and returns the data for that post, 
// if the post is not found it returns a not found object
export function getPostData(id) {
    const jsonObj = loadPostsData();
    const objReturned = jsonObj.filter(obj => {
        return obj.id.toString() === id;
      });
    if (objReturned.length === 0) {
        return {
          id: id,
          title: 'Not found',
          date: '',
          contentHtml: 'Not found'
        }
      } else {
        return objReturned[0];
      }
}