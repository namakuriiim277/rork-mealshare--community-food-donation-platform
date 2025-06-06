import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  bodySmall: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  button: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.background,
  },
});