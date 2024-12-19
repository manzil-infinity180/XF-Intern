import React, { useState, useEffect } from 'react'

export function AnimatedText({ words, staticText }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, 2000) // Change word every 2 seconds

    return () => clearInterval(intervalId)
  }, [words.length])

  return (
    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
      {staticText}{' '}
      <span className="text-primary transition-all duration-500 ease-in-out">
        {words[currentWordIndex]}
      </span>
    </h1>
  )
}

