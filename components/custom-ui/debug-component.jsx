"use client"
import { useEffect } from 'react';

export default function DebugComponent() { 
useEffect(() => { console.log('Component mounted/remounted'); }, []);

console.log('Component rendered');

return <div>Debug Component</div>; 
}