"use client"
import { formatter } from '@/utils/formatters';
import React from 'react'

export default function Currency({ value }) {
    // Convert value to a number before formatting
    const numericValue = Number(value); // or use parseFloat(value)
    
    return (
      <p className='font-semibold'>
        {formatter.format(numericValue)}
      </p>
    )
  }
  