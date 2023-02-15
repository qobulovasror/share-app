function Result({name, type}) {
  const pStyle = {
    padding: '2px 8px',
    borderRadius: '10px',
    background: 'rgb(204, 204, 204)',
    top: '20px',
    right: '1%',
    transform: 'translateY(-50%)',
    position: 'absolute',
  }
  return (
    <li className='row around' style={{position: 'relative'}}>
      <h3 className="t-center">{name}</h3>
      <p style={pStyle}>{type}</p>
    </li>
  );
}

export default Result;
