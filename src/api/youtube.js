import axios from 'axios';

export default axios.create({
params: {
    part: 'snippet',
    maxResults: 5,
    key:'[AIzaSyBSQzLyiqI_VSMPYK_LBWI2z5gGjRXGaIM]',
    }
});