import React, { useState } from 'react'
import PubSub from '@harryy/pubsub'
import { Trans } from '@lingui/macro'
import {
    FormGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Grid,
    Radio
} from '@material-ui/core'
import { DndComponentItem, RenderProps } from '../../types'
import * as yup from 'yup'
import { getComponentState, getFromikProps } from '../../utils'
import { useFormikContext } from 'formik'

export default {
    render: (renderProps: RenderProps, id: string, formKey) => {
        const state = getComponentState(renderProps, id)
        const handleClick = (ev: React.MouseEvent<HTMLFieldSetElement>) => {
            ev.preventDefault()
            PubSub.publish('component/click', { type: 'form-elements', data: id })
        }
        const labelText = `${state?.question}${state?.required ? '*' : ''}`

        let formikProps: any = {
            onControlClick: handleClick,
            inputValue: '',
            setInputValue: () => {}
        }
        if (!renderProps.buildermode && formKey) {
            const formik = useFormikContext()
            const [inputValue, setInputValue] = useState('')
            formikProps = getFromikProps(formKey, formik)
            formikProps.onChange = (value: string | boolean) => {
                formik.setFieldValue(formKey, value)
            }
            formikProps = { ...formikProps, ...{ inputValue, setInputValue } }
            formikProps.onControlClick = () => {}
            console.log(formikProps, 'radio')
        }

        return (
            <FormControl
                fullWidth
                component="fieldset"
                style={{ textAlign: 'left' }}
                disabled={renderProps.buildermode}
                onClick={formikProps.onControlClick}
                error={formikProps?.error}
            >
                <FormLabel component="legend">{labelText}</FormLabel>
                <FormGroup>
                    {state?.options
                        ?.filter((option: string) => option.length > 0)
                        .map((option: string, i: number) => (
                            <FormControlLabel
                                key={i}
                                control={
                                    <Radio
                                        name={option}
                                        checked={formikProps?.value === option}
                                        onClick={() => formikProps?.onChange(option)}
                                    />
                                }
                                label={option}
                            />
                        ))}
                    {state?.showOther && (
                        <FormControlLabel
                            key={'other'}
                            control={
                                <Radio
                                    defaultChecked={formikProps?.value?.['other']}
                                    onClick={() => formikProps.onChange(formikProps.inputValue)}
                                />
                            }
                            label={
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Trans>Other</Trans>
                                    </Grid>
                                    <Input
                                        type="text"
                                        placeholder="Custom option"
                                        defaultValue={formikProps.inputValue}
                                        onBlur={(e) => formikProps.setInputValue(e.target.value)}
                                    />
                                </Grid>
                            }
                        />
                    )}
                </FormGroup>
                <FormHelperText>{formikProps.helperText || state?.hint}</FormHelperText>
            </FormControl>
        )
    },
    export: () => '',
    initialValues: {
        question: 'Question',
        placeholder: 'Placeholder',
        showOther: false,
        hint: 'Optional Hint',
        options: ['Yes', 'No'],
        validation: { type: 'none' },
        pii: '',
        className: '',
        required: true,
        enabled: true,
        style: {
            textAlign: 'left'
        }
    },
    settings: [
        { id: 'question', type: 'labeledTextInput', grid: 12, label: <Trans>Question</Trans> },
        {
            id: 'placeholder',
            type: 'labeledTextInput',
            grid: 12,
            label: <Trans>Custom Placeholder</Trans>
        },
        { id: 'hint', type: 'labeledTextInput', grid: 12, label: <Trans>Hint</Trans> },
        { id: 'pii', type: 'labeledTextInput', grid: 12, label: <Trans>PII</Trans> },
        { id: 'className', type: 'labeledTextInput', grid: 12, label: <Trans>Class name</Trans> },
        { id: 'options', type: 'inputOptions', grid: 12, label: <Trans>Options</Trans> },
        {
            id: 'showOther',
            type: 'labeledSwitch',
            grid: 12,
            label: <Trans>Show other option with custom text</Trans>
        },
        { id: 'required', type: 'labeledSwitch', grid: 12, label: <Trans>Required</Trans> },
        { id: 'enabled', type: 'labeledSwitch', grid: 12, label: <Trans>Enabled</Trans> }
    ],
    validationSchema: (renderProps, id) => {
        const state = getComponentState(renderProps, id)
        let schema: any = yup.string()
        schema = state?.required ? schema.required('Field is required') : schema
        return schema
    }
} as DndComponentItem
