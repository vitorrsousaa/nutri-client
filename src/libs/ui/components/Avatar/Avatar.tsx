import {
  Avatar as ChakraUIAvatar,
  AvatarProps as ChakraUIAvatarProps,
} from '@chakra-ui/avatar';

interface AvatarProps extends ChakraUIAvatarProps {}

export function Avatar(props: AvatarProps) {
  return <ChakraUIAvatar {...props} bg="#5048E5" color={'white'} />;
}
