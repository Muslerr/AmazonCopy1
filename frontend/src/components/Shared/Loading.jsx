import Spinner from 'react-bootstrap/Spinner'

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh',width: '100vw' }}>
        <Spinner animation='border' role='status'>
            <span className='visually-hidden'>loading...</span>
        </Spinner>
    </div>
);

}

export default Loading