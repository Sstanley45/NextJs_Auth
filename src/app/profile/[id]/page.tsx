import React from 'react'

const GrabParam = ({params}: any) => {
  return (
    <>
      <div>Welcome</div>
          <h1>Hello User!, This is your id  { params.id}</h1>
    </>
  );
}

export default GrabParam;