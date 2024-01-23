import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
  return (
    <Spinner animation='border' role='status'><span className='visually-hidden'>loading...</span></Spinner>
  )
}

export default Loading