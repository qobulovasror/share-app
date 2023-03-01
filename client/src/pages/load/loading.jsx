import './style.css';

const Loading = () => {
  return (
    <>
      <div>
        <div className="box-load">
          <div className="head1"></div>
          <div className="head2"></div>
          <div className="eats">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
        <h3 className='loadText'>
            Loading
                <div className="dot">.</div>
                <div className="dot">.</div>
                <div className="dot">.</div>
        </h3>
      </div>
    </>
  );
};
export default Loading;