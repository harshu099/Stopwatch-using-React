import React from 'react'
import './Stopwatch.css'

function Stopwatch() {
  const [time, setTime] = React.useState(0)
  const [timeon, setTimeon] = React.useState(false)
  const [lapCount, setLapCount] = React.useState(1)

  let hour = ("0" + Math.floor((time / 3600000) % 60)).slice(-2)
  let minute = ("0" + Math.floor((time / 60000) % 60)).slice(-2)
  let second = ("0" + Math.floor((time / 1000) % 60)).slice(-2)
  let millisecond = ("0" + ((time / 10) % 100)).slice(-2)

  function displayLap() {

    setLapCount(prevLap => prevLap + 1)

    const node = document.createElement("tr");
    const textnode = document.createTextNode(`${lapCount}.     ${hour}:${minute}:${second}:${millisecond}`);
    node.appendChild(textnode);
    document.getElementById("display").appendChild(node);
  }

  function clearLap() {
    setLapCount(1)
    document.getElementById('display').innerHTML = '';
  }

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
      <div className='time_wrapper'>
        <span>{hour}:</span>
        <span>{minute}:</span>
        <span>{second}.</span>
        <span className='millisecond'>{millisecond}</span>
      </div>
      <div className='button_wrapper'>
        {!timeon && time === 0 &&
          (<button onClick={() => setTimeon(true)} >Start</button>)
        }
        {timeon &&
          (<button onClick={() => setTimeon(false)} >Stop</button>)
        }
        {timeon &&
          (<button onClick={displayLap} >Lap</button>)
        }
        {!timeon && time !== 0 &&
          (<button onClick={() => setTimeon(true)} >Resume</button>)
        }
        {!timeon && time > 0 &&
          (<button onClick={() => setTime(0)} >Reset</button>)
        }
        {!timeon && time > 0 && lapCount > 1 &&
          (<button onClick={clearLap} >Clear Lap</button>)
        }

      </div>
      <div className='lap_wrapper'>
        {/* <ol id='display'>
        <h1>LAPS</h1>

        </ol> */}
        <table id='display'>
          <tr>
            <th>LAP</th>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Stopwatch