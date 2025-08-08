import React from 'react';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

export type IconName = 
  | 'home'
  | 'search'
  | 'heart'
  | 'user'
  | 'cart'
  | 'arrow-left'
  | 'arrow-right'
  | 'chevron-down'
  | 'chevron-up'
  | 'plus'
  | 'minus'
  | 'close'
  | 'star'
  | 'filter'
  | 'sort'
  | 'bell'
  | 'mail'
  | 'phone'
  | 'location'
  | 'settings'
  | 'edit'
  | 'delete'
  | 'share'
  | 'download'
  | 'upload'
  | 'camera'
  | 'image'
  | 'video'
  | 'music'
  | 'file'
  | 'folder'
  | 'link'
  | 'external-link'
  | 'check'
  | 'check-circle'
  | 'info'
  | 'warning'
  | 'error'
  | 'success'
  | 'loading'
  | 'refresh'
  | 'menu'
  | 'grid'
  | 'list'
  | 'calendar'
  | 'clock'
  | 'tag'
  | 'price'
  | 'discount'
  | 'gift'
  | 'truck'
  | 'shield'
  | 'lock'
  | 'unlock'
  | 'eye'
  | 'eye-off'
  | 'key'
  | 'wifi'
  | 'bluetooth'
  | 'battery'
  | 'volume'
  | 'mute'
  | 'play'
  | 'pause'
  | 'stop'
  | 'skip-back'
  | 'skip-forward'
  | 'rewind'
  | 'fast-forward'
  | 'shuffle'
  | 'repeat'
  | 'volume-up'
  | 'volume-down'
  | 'mic'
  | 'mic-off'
  | 'headphones'
  | 'speaker'
  | 'radio'
  | 'tv'
  | 'computer'
  | 'laptop'
  | 'tablet'
  | 'mobile'
  | 'watch'
  | 'gamepad'
  | 'controller'
  | 'joystick'
  | 'mouse'
  | 'keyboard'
  | 'printer'
  | 'scanner'
  | 'projector'
  | 'webcam'
  | 'microphone'
  | 'headset'
  | 'earbuds'
  | 'airpods'
  | 'bluetooth-speaker'
  | 'smart-speaker'
  | 'homepod'
  | 'echo'
  | 'alexa'
  | 'siri'
  | 'google'
  | 'cortana'
  | 'bixby'
  | 'assistant'
  | 'bot'
  | 'robot'
  | 'ai'
  | 'machine-learning'
  | 'neural-network'
  | 'algorithm'
  | 'data'
  | 'analytics'
  | 'chart'
  | 'graph'
  | 'trending-up'
  | 'trending-down'
  | 'bar-chart'
  | 'pie-chart'
  | 'line-chart'
  | 'area-chart'
  | 'scatter-plot'
  | 'histogram'
  | 'box-plot'
  | 'heatmap'
  | 'map'
  | 'globe'
  | 'earth'
  | 'world'
  | 'country'
  | 'flag'
  | 'language'
  | 'translate'
  | 'dictionary'
  | 'thesaurus'
  | 'spell-check'
  | 'grammar'
  | 'writing'
  | 'pen'
  | 'pencil'
  | 'marker'
  | 'highlighter'
  | 'eraser'
  | 'paper'
  | 'notebook'
  | 'journal'
  | 'diary'
  | 'planner'
  | 'calendar'
  | 'schedule'
  | 'appointment'
  | 'meeting'
  | 'conference'
  | 'webinar'
  | 'workshop'
  | 'seminar'
  | 'lecture'
  | 'class'
  | 'course'
  | 'lesson'
  | 'tutorial'
  | 'guide'
  | 'manual'
  | 'instruction'
  | 'help'
  | 'support'
  | 'faq'
  | 'question'
  | 'answer'
  | 'solution'
  | 'fix'
  | 'repair'
  | 'maintenance'
  | 'service'
  | 'customer'
  | 'client'
  | 'user'
  | 'profile'
  | 'account'
  | 'login'
  | 'logout'
  | 'signup'
  | 'signin'
  | 'register'
  | 'unregister'
  | 'subscribe'
  | 'unsubscribe'
  | 'follow'
  | 'unfollow'
  | 'like'
  | 'dislike'
  | 'love'
  | 'hate'
  | 'angry'
  | 'sad'
  | 'happy'
  | 'excited'
  | 'surprised'
  | 'confused'
  | 'worried'
  | 'scared'
  | 'embarrassed'
  | 'proud'
  | 'ashamed'
  | 'guilty'
  | 'innocent'
  | 'brave'
  | 'coward'
  | 'hero'
  | 'villain'
  | 'good'
  | 'evil'
  | 'angel'
  | 'devil'
  | 'heaven'
  | 'hell'
  | 'paradise'
  | 'nightmare'
  | 'dream'
  | 'reality'
  | 'fantasy'
  | 'fiction'
  | 'non-fiction'
  | 'biography'
  | 'autobiography'
  | 'memoir'
  | 'diary'
  | 'journal'
  | 'blog'
  | 'vlog'
  | 'podcast'
  | 'radio'
  | 'tv'
  | 'movie'
  | 'film'
  | 'cinema'
  | 'theater'
  | 'stage'
  | 'performance'
  | 'concert'
  | 'show'
  | 'exhibition'
  | 'gallery'
  | 'museum'
  | 'library'
  | 'bookstore'
  | 'coffee-shop'
  | 'restaurant'
  | 'cafe'
  | 'bar'
  | 'pub'
  | 'club'
  | 'party'
  | 'celebration'
  | 'festival'
  | 'carnival'
  | 'parade'
  | 'march'
  | 'protest'
  | 'rally'
  | 'demonstration'
  | 'revolution'
  | 'rebellion'
  | 'uprising'
  | 'mutiny'
  | 'coup'
  | 'overthrow'
  | 'takeover'
  | 'invasion'
  | 'attack'
  | 'defense'
  | 'war'
  | 'peace'
  | 'truce'
  | 'ceasefire'
  | 'armistice'
  | 'treaty'
  | 'agreement'
  | 'contract'
  | 'deal'
  | 'bargain'
  | 'negotiation'
  | 'compromise'
  | 'settlement'
  | 'resolution'
  | 'solution'
  | 'answer'
  | 'question'
  | 'problem'
  | 'issue'
  | 'matter'
  | 'affair'
  | 'business'
  | 'company'
  | 'corporation'
  | 'enterprise'
  | 'organization'
  | 'institution'
  | 'foundation'
  | 'charity'
  | 'non-profit'
  | 'ngo'
  | 'government'
  | 'politics'
  | 'election'
  | 'vote'
  | 'ballot'
  | 'poll'
  | 'survey'
  | 'research'
  | 'study'
  | 'experiment'
  | 'test'
  | 'trial'
  | 'exam'
  | 'quiz'
  | 'assessment'
  | 'evaluation'
  | 'review'
  | 'feedback'
  | 'comment'
  | 'remark'
  | 'note'
  | 'annotation'
  | 'highlight'
  | 'bookmark'
  | 'favorite'
  | 'star'
  | 'heart'
  | 'diamond'
  | 'gem'
  | 'jewel'
  | 'treasure'
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'copper'
  | 'iron'
  | 'steel'
  | 'aluminum'
  | 'titanium'
  | 'platinum'
  | 'palladium'
  | 'rhodium'
  | 'iridium'
  | 'osmium'
  | 'ruthenium'
  | 'rhenium'
  | 'tungsten'
  | 'molybdenum'
  | 'niobium'
  | 'tantalum'
  | 'vanadium'
  | 'chromium'
  | 'manganese'
  | 'cobalt'
  | 'nickel'
  | 'zinc'
  | 'cadmium'
  | 'mercury'
  | 'lead'
  | 'bismuth'
  | 'polonium'
  | 'astatine'
  | 'radon'
  | 'francium'
  | 'radium'
  | 'actinium'
  | 'thorium'
  | 'protactinium'
  | 'uranium'
  | 'neptunium'
  | 'plutonium'
  | 'americium'
  | 'curium'
  | 'berkelium'
  | 'californium'
  | 'einsteinium'
  | 'fermium'
  | 'mendelevium'
  | 'nobelium'
  | 'lawrencium'
  | 'rutherfordium'
  | 'dubnium'
  | 'seaborgium'
  | 'bohrium'
  | 'hassium'
  | 'meitnerium'
  | 'darmstadtium'
  | 'roentgenium'
  | 'copernicium'
  | 'nihonium'
  | 'flerovium'
  | 'moscovium'
  | 'livermorium'
  | 'tennessine'
  | 'oganesson';

// Icon component that renders SVG icons
export const IconComponent: React.FC<{
  name: IconName;
  size?: number;
  color?: string;
  fill?: string;
  className?: string;
}> = ({ name, size = 24, color = '#000000', fill = 'none', className }) => {
  const iconProps = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: fill === 'none' ? 'none' : fill,
    stroke: fill === 'none' ? color : 'none',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  // This is a simplified icon mapping - in a real app, you'd have actual SVG paths
  const getIconPath = (iconName: IconName) => {
    switch (iconName) {
      case 'home':
        return <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />;
      case 'search':
        return (
          <>
            <Circle cx="11" cy="11" r="8" />
            <Path d="m21 21-4.35-4.35" />
          </>
        );
      case 'heart':
        return <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />;
      case 'user':
        return (
          <>
            <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <Circle cx="12" cy="7" r="4" />
          </>
        );
      case 'cart':
        return (
          <>
            <Circle cx="9" cy="21" r="1" />
            <Circle cx="20" cy="21" r="1" />
            <Path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </>
        );
      case 'arrow-left':
        return <Path d="m12 19-7-7 7-7" />;
      case 'arrow-right':
        return <Path d="m12 5 7 7-7 7" />;
      case 'chevron-down':
        return <Path d="m6 9 6 6 6-6" />;
      case 'chevron-up':
        return <Path d="m18 15-6-6-6 6" />;
      case 'plus':
        return (
          <>
            <Line x1="12" y1="5" x2="12" y2="19" />
            <Line x1="5" y1="12" x2="19" y2="12" />
          </>
        );
      case 'minus':
        return <Line x1="5" y1="12" x2="19" y2="12" />;
      case 'close':
        return (
          <>
            <Line x1="18" y1="6" x2="6" y2="18" />
            <Line x1="6" y1="6" x2="18" y2="18" />
          </>
        );
      case 'star':
        return <Path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />;
      case 'filter':
        return <Path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />;
      case 'sort':
        return (
          <>
            <Path d="m3 6 4-4 4 4" />
            <Path d="M7 2v20" />
            <Path d="m21 18-4 4-4-4" />
            <Path d="M17 22V2" />
          </>
        );
      case 'bell':
        return (
          <>
            <Path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <Path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </>
        );
      case 'mail':
        return (
          <>
            <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <Path d="m22 6-10 7L2 6" />
          </>
        );
      case 'phone':
        return <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />;
      case 'location':
        return (
          <>
            <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <Circle cx="12" cy="10" r="3" />
          </>
        );
      case 'settings':
        return (
          <>
            <Circle cx="12" cy="12" r="3" />
            <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </>
        );
      case 'edit':
        return (
          <>
            <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </>
        );
      case 'delete':
        return (
          <>
            <Path d="M3 6h18" />
            <Path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <Line x1="10" y1="11" x2="10" y2="17" />
            <Line x1="14" y1="11" x2="14" y2="17" />
          </>
        );
      case 'share':
        return (
          <>
            <Circle cx="18" cy="5" r="3" />
            <Circle cx="6" cy="12" r="3" />
            <Circle cx="18" cy="19" r="3" />
            <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </>
        );
      case 'download':
        return (
          <>
            <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <Polyline points="7,10 12,15 17,10" />
            <Line x1="12" y1="15" x2="12" y2="3" />
          </>
        );
      case 'upload':
        return (
          <>
            <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <Polyline points="17,8 12,3 7,8" />
            <Line x1="12" y1="3" x2="12" y2="15" />
          </>
        );
      case 'camera':
        return (
          <>
            <Path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <Circle cx="12" cy="13" r="4" />
          </>
        );
      case 'image':
        return (
          <>
            <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <Circle cx="8.5" cy="8.5" r="1.5" />
            <Path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </>
        );
      case 'video':
        return (
          <>
            <Polygon points="23,7 16,12 23,17 23,7" />
            <Rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </>
        );
      case 'music':
        return (
          <>
            <Path d="M9 18V5l12-2v13" />
            <Circle cx="6" cy="18" r="3" />
            <Circle cx="18" cy="16" r="3" />
          </>
        );
      case 'file':
        return (
          <>
            <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <Polyline points="14,2 14,8 20,8" />
            <Line x1="16" y1="13" x2="8" y2="13" />
            <Line x1="16" y1="17" x2="8" y2="17" />
            <Line x1="10" y1="9" x2="8" y2="9" />
          </>
        );
      case 'folder':
        return (
          <>
            <Path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </>
        );
      case 'link':
        return (
          <>
            <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </>
        );
      case 'external-link':
        return (
          <>
            <Path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <Polyline points="15,3 21,3 21,9" />
            <Line x1="10" y1="14" x2="21" y2="3" />
          </>
        );
      case 'check':
        return <Polyline points="20,6 9,17 4,12" />;
      case 'check-circle':
        return (
          <>
            <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <Polyline points="22,4 12,14.01 9,11.01" />
          </>
        );
      case 'info':
        return (
          <>
            <Circle cx="12" cy="12" r="10" />
            <Line x1="12" y1="16" x2="12" y2="12" />
            <Line x1="12" y1="8" x2="12.01" y2="8" />
          </>
        );
      case 'warning':
        return (
          <>
            <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <Line x1="12" y1="9" x2="12" y2="13" />
            <Line x1="12" y1="17" x2="12.01" y2="17" />
          </>
        );
      case 'error':
        return (
          <>
            <Circle cx="12" cy="12" r="10" />
            <Line x1="15" y1="9" x2="9" y2="15" />
            <Line x1="9" y1="9" x2="15" y2="15" />
          </>
        );
      case 'success':
        return (
          <>
            <Path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <Polyline points="22,4 12,14.01 9,11.01" />
          </>
        );
      case 'loading':
        return (
          <>
            <Line x1="12" y1="2" x2="12" y2="6" />
            <Line x1="12" y1="18" x2="12" y2="22" />
            <Line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
            <Line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
            <Line x1="2" y1="12" x2="6" y2="12" />
            <Line x1="18" y1="12" x2="22" y2="12" />
            <Line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
            <Line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
          </>
        );
      case 'refresh':
        return (
          <>
            <Path d="M23 4v6h-6" />
            <Path d="M1 20v-6h6" />
            <Path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
          </>
        );
      case 'menu':
        return (
          <>
            <Line x1="3" y1="6" x2="21" y2="6" />
            <Line x1="3" y1="12" x2="21" y2="12" />
            <Line x1="3" y1="18" x2="21" y2="18" />
          </>
        );
      case 'grid':
        return (
          <>
            <Rect x="3" y="3" width="7" height="7" />
            <Rect x="14" y="3" width="7" height="7" />
            <Rect x="14" y="14" width="7" height="7" />
            <Rect x="3" y="14" width="7" height="7" />
          </>
        );
      case 'list':
        return (
          <>
            <Line x1="8" y1="6" x2="21" y2="6" />
            <Line x1="8" y1="12" x2="21" y2="12" />
            <Line x1="8" y1="18" x2="21" y2="18" />
            <Line x1="3" y1="6" x2="3.01" y2="6" />
            <Line x1="3" y1="12" x2="3.01" y2="12" />
            <Line x1="3" y1="18" x2="3.01" y2="18" />
          </>
        );
      default:
        return <Rect x="2" y="2" width="20" height="20" rx="2" ry="2" />;
    }
  };

  return (
    <Svg {...iconProps}>
      {getIconPath(name)}
    </Svg>
  );
};

// Helper components for specific icon types
export const Polyline = ({ points, ...props }: { points: string } & any) => (
  <Path d={points.split(' ').map((point, index) => 
    index % 2 === 0 ? `L${point}` : point
  ).join(' ').replace(/^L/, 'M')} {...props} />
);

export const Polygon = ({ points, ...props }: { points: string } & any) => (
  <Path d={`M${points.split(' ').join(' L')} Z`} {...props} />
);
