import React from 'react'

const GrabParam = ({params}: any) => {
  return (
    <>
      <div>Welcome</div>
          <h1>Good morning, { params.id}</h1>
    </>
  );
}

export default GrabParam;