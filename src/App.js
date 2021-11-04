import React from "react";
import youtube from './api/youtube';
import {SearchBar, VideoList, VideoDetail} from './components';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      videoID: null,
      videoInfo: {
        title: "",
        description: ""
      },
      videoComments: [],
      replies: []
    }
  }


  baseURL = 'https://www.googleapis.com/youtube/v3/'
  searchURL = 'https://www.googleapis.com/youtube/v3/search'
  commentURL = 'http://127.0.0.1:8000/comments/'
  replyURL = 'http://127.0.0.1:8000/commentsection/'

  playVideo = (video) => {
    this.setState({
      videoID: video.id.videoId,
      videoInfo: {
        title: video.snippet.title,
        description: video.snippet.description,
        channelTitle: video.snippet.channelTitle
      },
      replies: []
    })
    this.getRelatedVideos(video.id.videoId)
    this.getVideoComments(video.id.videoId)
    this.getReplies(video.id.videoId)
    this.getVideoInformation(video.id.videoId)
  }

  relatedVideos = async (videoID) => {
    try {
      const response = await axios.get(this.searchURL, {
        params: {
          key:'[AIzaSyBSQzLyiqI_VSMPYK_LBWI2z5gGjRXGaIM]',
          type: "video",
          part: "snippet",
          maxResults: 5,
          relatedToVideoId: videoID,
        }
      })
      this.setState({
        searchResults: response.data.items
      })
    }
    catch(err) {
      console.log(err)
    }
  }



  render() {
    return (
      <div className="container-fluid">
        <TitleBar searchResults={this.searchResults} />
        <div className="row">
          <div className="col-md-9">
            {this.state.videoID != null && <VideoPlayer replies = {this.state.replies} postReply = {this.postReply} videoId={this.state.videoID} videoInfo={this.state.videoInfo} videoComments={this.state.videoComments} postComment = {this.postComment} likeComment={this.likeComment}/>}
          </div>
          <div className="col-md-3">
            <SearchResultsList playVideo={this.playVideo} results={this.state.searchResults} />
          </div>
        </div>
      </div>

    );
  }
}

export default App;

