import { ComponentProps } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface LogoProps extends SvgProps{
}

export default function Logo({
    width = 55*2,
    height = 82*2,
    ...props
}: LogoProps) {
    return <Svg
        width={width}
        height={height}
        viewBox="0 0 55 82"
        fill="none"
        {...props}
    >
        <Path
            d="M31 43.8015H49.1401C51.4346 43.8015 53.2937 45.4909 53.2937 47.5754V53.6936C53.2937 69.7902 40.39 81.6689 24.6491 79.8079C11.8969 78.2997 2 67.2906 2 53.9323V47.5744C2 45.49 3.8601 43.8005 6.15359 43.8005H25.5"
            stroke={props.stroke}
            strokeWidth="2.7121"
            strokeMiterlimit="10"
            />
        <Path
            d="M18.5355 77.9507L25.1734 66.9204C25.4495 66.4612 25.5952 65.9357 25.5952 65.3998V51.8507V39.1369C25.5952 38.3899 25.3114 37.6708 24.8023 37.1243L14.0291 27.5601"
            stroke={props.stroke}
            strokeWidth="2.7121"
            strokeMiterlimit="10"
            />
        <Path
            d="M39.9278 27.9005L38.2767 34.2153C38.1482 34.7062 37.8961 35.1549 37.5432 35.5193L31.3963 41.8743C30.8641 42.4246 30.5669 43.1591 30.5669 43.9242V51.8498V65.2646C30.5669 65.8801 30.7596 66.4813 31.1182 66.9818L38.9767 77.9507"
            stroke={props.stroke}
            strokeWidth="2.7121"
            strokeMiterlimit="10"
            />
        <Path
            d="M17.2779 7.85165C16.6949 5.41721 19.2013 2 19.2013 2C19.2013 2 22.9819 3.91283 23.5648 6.34822C24.1478 8.78266 21.4765 11.5086 21.4765 11.5086C21.4765 11.5086 17.8608 10.287 17.2779 7.85165Z"
            stroke={props.stroke}
            strokeWidth="2.2782"
            strokeMiterlimit="10"
            />
        <Path
            d="M8.47479 27.1861C6.53799 25.5992 6.46704 21.3622 6.46704 21.3622C6.46704 21.3622 10.635 20.599 12.5718 22.1859C14.5086 23.7727 14.0292 27.5591 14.0292 27.5591C14.0292 27.5591 10.4106 28.7729 8.47479 27.1861Z"
            stroke={props.stroke}
            strokeWidth="2.2782"
            strokeMiterlimit="10"
            />
        <Path
            d="M39.8388 22.8244C41.4055 20.8723 45.6415 20.7582 45.6415 20.7582C45.6415 20.7582 46.447 24.9185 44.8803 26.8706C43.3135 28.8228 39.5224 28.3827 39.5224 28.3827C39.5224 28.3827 38.2721 24.7766 39.8388 22.8244Z"
            stroke={props.stroke}
            strokeWidth="2.2782"
            strokeMiterlimit="10"
            />
        <Path
            d="M28.1402 13.1989C29.4289 11.0522 33.6103 10.3676 33.6103 10.3676C33.6103 10.3676 34.9708 14.3802 33.6822 16.527C32.3935 18.6738 28.5774 18.7495 28.5774 18.7495C28.5774 18.7495 26.8516 15.3457 28.1402 13.1989Z"
            stroke={props.stroke}
            strokeWidth="2.2782"
            strokeMiterlimit="10"
            />
        <Path
            d="M21.4177 34.1193V11.2065"
            stroke={props.stroke}
            strokeWidth="2.7121"
            strokeMiterlimit="10"
            />
        <Path
            d="M35.2519 38.4484L27.6696 30.192C27.0281 29.493 26.7616 28.5294 26.9543 27.6003L28.7847 18.7495"
            stroke={props.stroke}
            strokeWidth="2.7121"
            strokeMiterlimit="10"
        />
    </Svg>
}