import { createTheme } from '@mui/material/styles'

export const themeModes = {
    dark: 'dark',
    light: 'light'
}

const themeConfigs = {
    custom: ({ mode }: any) => {
        const customPalette: any = mode === themeModes.light ? {
            buttonBlue: '#1b74e4',
            background: '#f0f2f5',
            backgroundInput: '#f0f2f5',
            backgroundCard: '#ffffff',
            primaryText: '#050505',
            secondText: '#65676B',
            buttonGreen: '#229742'
        } : {
            buttonBlue: '#2374E1',
            background: '#18191a',
            backgroundInput: '#3a3b3c',
            backgroundCard: '#242526',
            primaryText: '#E4E6EB',
            secondText: '#B0B3B8',
            buttonGreen: '#058A36'
        }
        return createTheme({
            palette: {
                mode,
                ...customPalette,
            },
            components: {
                MuiButton: {
                    defaultProps: { disableElevation: true },
                },
                MuiTypography: {
                    defaultProps: {
                        fontFamily: 'Roboto',
                    }
                }
            }
        })
    }
}

export default themeConfigs