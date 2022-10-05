import React from 'react'

function Stopwatch() {
  const [time, setTime] = React.useState(0)
  const [timeon, setTimeon] = React.useState(false)

  React.useEffect(() => {
    let interval = null;

    if (timeon) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)
    }
    else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [timeon])

  return (
    <div>
      <div>
        <span>{("0" + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div>
        {!timeon && time === 0 &&
          (<button onClick={() => setTimeon(true)} >Start</button>)
        }
        {timeon &&
          (<button onClick={() => setTimeon(false)} >Stop</button>)
        }
        {!timeon && time !== 0 &&
          (<button onClick={() => setTimeon(true)} >Resume</button>)
        }
        {!timeon && time > 0 &&
          (<button onClick={() => setTime(0)} >Reset</button>)
        }
      </div>
    </div>
  )
}

export default Stopwatch