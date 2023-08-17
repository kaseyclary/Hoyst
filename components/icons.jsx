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


export const EllipsisIcon = ({ height = 100, width = 100, color = 'gray', handleEllipsisClick, isSelected }) => {
  return (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 100 100" 
        width={width} 
        height={height} 
        onClick={handleEllipsisClick} 
        className={`${isSelected ? "transform rotate-90" : ""} transition-transform duration-500`}
    >
        <circle cx="15" cy="50" r="10" fill={color} />
        <circle cx="50" cy="50" r="10" fill={color} />
        <circle cx="85" cy="50" r="10" fill={color} />
      </svg>
  );
};



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

export const LeftArrowIcon = ({height, width, color}) => {
  return (
    <svg
      width={width || "200"}
      height={height || "200"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M 150 100 L 50 50 L 150 0"
        fill="none"
        stroke={color || "#333"}
        strokeWidth="10"
      />
    </svg>
  )
}

export const DotIcon = ({height, width, color}) => {
  return (
    <svg
      width={width || "2"}
      height={height || "2"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="1" cy="1" r="1" fill={color || "#333"} />
    </svg>
  )
}

export const HomeIcon = ({height, width, color}) => {
}

export const FriendsIcon = ({height, width, color}) => {
}

export const ProfileIcon = ({height, width, color}) => {
}

export const GoalsIcon = ({height, width, color}) => {
}

export const AnalyticsIcon = ({height, width, color}) => {
}
