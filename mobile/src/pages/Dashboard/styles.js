import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background: #ccc;
  padding: 30px;
`;

export const Logo = styled.Image``;

export const CardsContainer = styled.View`
  flex: 1;
  align-self: stretch;
  justify-content: center;
  max-height: 400px;
  z-index: 1;
`;

export const Card = styled.View`
  border-width: 1px;
  border-color: #ddd;
  border-radius: 8px;
  margin: 30px;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Avatar = styled.Image`
  flex: 1;
  height: 500px;
  background: #fff;
`;

export const Footer = styled.View`
  background: #fff;
  padding: 15px 20px;
`;

export const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 3,
})`
  font-size: 14px;
  color: #999;
  z-index: ${props => (props.zIndex ? props.zIndex : 1)};
  margin-top: 2px;
  line-height: 20px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  margin-bottom: 30px;
  z-index: 1;
`;

export const Button = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #fff;
  justify-content: center;
  align-items: center;
  margin: 0 20px;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 2;
`;

export const ImageButton = styled.Image``;

export const Empty = styled.Text`
  flex: 1;
  align-self: center;
  color: #666;
  font-size: 30px;
  font-weight: bold;
`;

export const MatchContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
`;

export const MatchLogo = styled.Image`
  height: 60px;
  resize-mode: contain;
`;

export const MatchAvatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  border-width: 5px;
  border-color: #fff;
  margin: 30px 0;
`;

export const MatchName = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: #fff;
`;

export const MatchBio = styled.Text`
  margin-top: 10px;
  font-size: 16px;
  line-height: 26px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 30px 0;
`;

export const CloseButton = styled.TouchableOpacity`
  border: 0;
  margin-top: 30px;
`;

export const CloseButtonText = styled.Text`
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
`;
