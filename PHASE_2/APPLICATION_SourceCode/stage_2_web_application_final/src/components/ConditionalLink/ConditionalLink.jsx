import { Link } from 'react-router-dom';

// TODO: Let's make the design look like this: https://www.youtube.com/watch?v=juUaJpMd2LE

/**
 * Inspired by this [GitHub gist.](https://gist.github.com/kud/6b722de9238496663031dbacd0412e9d)
 */
export default function ConditionalLink({condition, to, children}) {
    return condition() ?
            (<Link to={to}>{children}</Link>) :
            (<>{children}</>);
}