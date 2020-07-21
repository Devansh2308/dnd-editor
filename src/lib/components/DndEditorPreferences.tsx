import { Trans } from '@lingui/macro'
import { fade } from '@material-ui/core/styles/colorManipulator'
import {
    CropLandscapeOutlined,
    ImageOutlined,
    PaletteOutlined,
    SettingsOutlined,
    TextFieldsOutlined,
    WallpaperOutlined
} from '@material-ui/icons'
import { groupBy } from 'lodash-es'
import React from 'react'
import { Theme, Grid, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useDndEditorContext } from '../DndEditorProvider'
import BackgroundImageSettings from './preferences/BackgroundImageSettings'
import BackgroundColorSettings from './preferences/BackgroundColorSettings'
import GeneralSettings from './preferences/GeneralSettings'
import ImageSettings from './preferences/ImageSettings'
import TextSettings from './preferences/TextSettings'
import ButtonSettings from './preferences/ButtonSettings'

const useStyles = makeStyles(
    ({ spacing, palette: { divider, text, primary }, shape: { borderRadius } }: Theme) => ({
        root: {
            width: '100%',
            height: '100%',
            overflowX: 'visible',
            overflowY: 'hidden'
        },
        actions: {
            flex: `0 0 ${spacing(7)}px`,
            width: spacing(7),
            borderRight: `1px solid ${fade(divider, 0.08)}`,
            padding: spacing(1, 0.75),
            display: 'flex',
            flexDirection: 'column'
        },
        content: {
            flex: 1,
            width: `calc(100% - ${spacing(7)}px)`,
            height: '100%',
            overflowY: 'auto',
            overflowX: 'visible'
        },
        toggleButtonGroup: {
            flexDirection: 'column'
        },
        toggleButton: {
            padding: spacing(0.2, 0),
            borderRadius: `${borderRadius * 2}px!important`,
            border: 'none',
            marginBottom: spacing(1),
            '&:hover': {
                color: text.primary
            },
            '&.Mui-selected, &.Mui-selected:hover': {
                color: primary.main,
                backgroundColor: fade(primary.main, 0.2)
            }
        },
        toggleButtonIcon: {
            padding: spacing(1),
            width: spacing(5),
            height: spacing(5)
        }
    })
)

const tabs = [
    {
        id: 'text',
        component: <TextSettings />,
        label: <Trans>Edit Text</Trans>,
        icon: TextFieldsOutlined
    },
    {
        id: 'image',
        component: <ImageSettings />,
        label: <Trans>Edit Image</Trans>,
        icon: ImageOutlined
    },
    {
        id: 'button',
        component: <ButtonSettings />,
        label: <Trans>Edit Button</Trans>,
        icon: CropLandscapeOutlined
    },
    {
        id: 'backgroundColor',
        component: <BackgroundColorSettings />,
        label: <Trans>Edit Background Color</Trans>,
        icon: PaletteOutlined
    },
    {
        id: 'backgroundImage',
        component: <BackgroundImageSettings />,
        label: <Trans>Edit Background Image</Trans>,
        icon: WallpaperOutlined
    },
    {
        id: 'generalSettings',
        component: <GeneralSettings />,
        label: <Trans>Edit General Settings</Trans>,
        icon: SettingsOutlined
    }
]

const DndEditorPreferences: React.FC = () => {
    const classes = useStyles()
    const { itemsMap, state, active } = useDndEditorContext()
    const [tab, setTab] = React.useState('generalSettings')
    const activeTab = React.useMemo(() => tabs.find((t) => t.id === tab)?.component, [tab])
    const activeItem = active ? itemsMap[state.entities[active].parent.id] : null
    const availableSettings = React.useMemo(
        () => [...Object.keys(groupBy(activeItem?.settings, 'type')), 'generalSettings'],
        [active]
    )
    const filteredTabs = React.useMemo(() => tabs.filter((t) => availableSettings.includes(t.id)), [
        active
    ])
    React.useEffect(() => {
        if (!filteredTabs.some((t) => t.id === tab)) {
            setTab('generalSettings')
        }
    }, [active])
    return (
        <Grid container className={classes.root}>
            <Grid item className={classes.actions}>
                <ToggleButtonGroup
                    value={tab}
                    exclusive
                    onChange={(ev, newValue) => newValue && setTab(newValue)}
                    className={classes.toggleButtonGroup}
                >
                    {filteredTabs.map((tb, i) => (
                        <ToggleButton key={i} value={tb.id} className={classes.toggleButton}>
                            <Tooltip placement="left" title={tb.label}>
                                <tb.icon fontSize="small" className={classes.toggleButtonIcon} />
                            </Tooltip>
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Grid>
            <Grid item className={classes.content}>
                {activeTab}
            </Grid>
        </Grid>
    )
}

export default DndEditorPreferences
