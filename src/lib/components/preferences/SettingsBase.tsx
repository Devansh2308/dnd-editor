import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Theme,
    Typography
} from '@material-ui/core'
import { ArrowDropDownOutlined } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'
import { Form, Formik } from 'formik'
import { get } from 'lodash-es'
import React from 'react'
import { DndItemSetting, DndStateItem, InitialValues, RenderProps } from '../../types'
import { updateItem } from '../../utils'
import FormObserver from './components/FormObserver'
import Field from './items/Field'

const useStyles = makeStyles(({}: Theme) => ({
    root: {
        borderLeftWidth: 0,
        borderRightWidth: 0,
        '&:not(:last-child)': {
            borderBottomWidth: 0
        },
        '&:before': {
            content: '"none"',
            display: 'none'
        }
    },
    label: {
        fontWeight: 500
    }
}))

interface Props {
    initialValues?: DndStateItem['values']
    settings?: DndItemSetting[]
    renderProps: RenderProps
    id: string
}

const SettingsBase: React.FC<Props> = ({ initialValues = {}, settings = [], renderProps, id }) => {
    const [expanded, setExpanded] = React.useState('')
    const handleChange = (childId: string) => (newValues: InitialValues) => {
        updateItem(renderProps, id, { [childId]: newValues })
    }
    const classes = useStyles()
    const canExpand = settings.length > 1

    return (
        <>
            {settings?.map((setting, i) => {
                const isExpanded = expanded === setting.id || !canExpand
                const color = isExpanded ? 'primary' : 'inherit'
                return (
                    <Accordion
                        square
                        variant="outlined"
                        className={classes.root}
                        expanded={isExpanded}
                        onChange={
                            canExpand ? (e, v) => setExpanded(v ? setting.id : '') : undefined
                        }
                        TransitionProps={{ mountOnEnter: true, unmountOnExit: true }}
                    >
                        <AccordionSummary
                            expandIcon={canExpand && <ArrowDropDownOutlined color={color} />}
                        >
                            <Typography color={color} variant="body2" className={classes.label}>
                                {setting.label}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Formik
                                key={i}
                                initialValues={get(initialValues, setting.id) ?? {}}
                                onSubmit={handleChange(setting.id)}
                            >
                                <Form>
                                    <Grid container spacing={2}>
                                        {setting.settings?.map((st, i) => (
                                            <Grid item xs={st.grid ?? 12} key={i}>
                                                <Field name={st.id} type={st.type} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <FormObserver onChange={handleChange(setting.id)} />
                                </Form>
                            </Formik>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </>
    )
}

export default SettingsBase
