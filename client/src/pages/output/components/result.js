function Result(props) {
  const { itemViewHandler, item } = props;
  const pStyle = {
    padding: '2px 8px',
    borderRadius: '10px',
    background: 'rgb(204, 204, 204)',
    top: '22px',
    right: '2%',
    transform: 'translateY(-50%)',
    position: 'absolute',
  }
  return (
    <li className='row around' 
      style={{position: 'relative'}}
      onClick={()=>itemViewHandler(item)}>
      <h3 className="t-center">{item.name}</h3>
      <p style={pStyle}>{item.dataType.type}</p>
    </li>
  );
}

export default Result;
