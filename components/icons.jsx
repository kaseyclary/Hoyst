export const XIcon = ({height, width, color}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} className=" font-bold flex items-center justify-center" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 4.5l10 10m0-10L5 14.5" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export const NotificationBellIcon = ({height, width, color}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} fill={color} viewBox="0 0 24 24" stroke={color}>
      <path d="M12 22c1.104 0 2-.896 2-2H10c0 1.104.896 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
    </svg>
  )
}


export const FistBumpIcon = ({height, width, color}) => {
 return (  
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
        <circle cx="35" cy="50" r="15" fill="gray"/>
        <rect x="45" y="35" width="10" height="30" fill="gray"/>
        <circle cx="65" cy="50" r="15" fill="gray"/>
        <rect x="45" y="35" width="10" height="30" fill="gray"/>
    </svg>
  )
}

export const KettleBellIcon = ({height, width, color}) => {
  return (
    <svg
    width="200"
    height="200"
    xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="100" cy="130" rx="80" ry="60" fill="#333" />
      <path
        d="M 40 80 Q 100 0 160 80"
        fill="none"
        stroke="#333"
        stroke-width="20"
      />
  </svg>
  )
}