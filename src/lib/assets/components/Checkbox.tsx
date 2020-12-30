import React, { useState, useRef } from 'react'
import PubSub from '@harryy/pubsub'
import { Trans } from '@lingui/macro'
import {
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Grid
} from '@material-ui/core'
import { DndComponentItem, FormValue, RenderProps, StringFormValue } from '../../types'
import * as yup from 'yup'
import { getComponentState, getFromikProps } from '../../utils'
import { FormikValues, useFormikContext } from 'formik'
import { InputOption } from '../../components/preferences/items/InputOptions'

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
        const formik = useFormikContext<FormikValues>()
        const checked: any = {}
        if (formik && formKey) {
            const [inputValue, setInputValue] = useState('')
            formikProps = getFromikProps(formKey, formik)
            formikProps.value = formik.values[formKey] || []
            formikProps.onChange = (option: string, checked: boolean) => {
                let oldValue: StringFormValue[] = formikProps.value.filter(
                    (formValue: StringFormValue) => formValue.text !== option
                )
                if (checked) oldValue = [{ text: option, valueType: 'String' }, ...oldValue]
                formik.setFieldValue(formKey, oldValue)
            }
            formikProps = { ...formikProps, inputValue }
            formikProps.onOtherCheckboxChange = (checked: boolean, inputValue: string) => {
                let oldValue: StringFormValue[] = formikProps.value.filter(
                    (value: StringFormValue) =>
                        state.options.find((o: InputOption) => o.label === value.text)
                )
                if (checked) oldValue.push({ text: inputValue, valueType: 'String' })
                formik.setFieldValue(formKey, oldValue)
            }
            formikProps.setInputValue = (newInputValue: string) => {
                let oldValue: StringFormValue[] = formikProps.value.filter(
                    (value: StringFormValue) =>
                        state.options.find((o: InputOption) => o.label !== value.text)
                )
                formikProps.onOtherCheckboxChange(oldValue.length !== 0, newInputValue)
                setInputValue(newInputValue)
            }
            formikProps.value.forEach(
                (value: FormValue) => (checked[(value as StringFormValue).text] = true)
            )
        }
        return (
            <FormControl
                fullWidth
                component="fieldset"
                style={{ textAlign: 'left' }}
                onClick={formikProps.onControlClick}
                error={formikProps?.error}
            >
                <FormLabel component="legend">{labelText}</FormLabel>
                <FormGroup>
                    {state?.options
                        ?.filter((option: InputOption) => option.label.length > 0)
                        .map((option: InputOption, i: number) => (
                            <FormControlLabel
                                key={i}
                                control={
                                    <Checkbox
                                        name={option.label}
                                        checked={!!checked[option.label]}
                                        onChange={(e) =>
                                            formikProps?.onChange?.(option.label, e.target.checked)
                                        }
                                    />
                                }
                                label={option.label}
                            />
                        ))}
                    {state?.showOther && (
                        <FormControlLabel
                            key={'other'}
                            control={
                                <Checkbox
                                    name="other"
                                    value={!!checked[formikProps.inputValue]}
                                    onChange={(e) =>
                                        formikProps.onOtherCheckboxChange?.(
                                            e.target.checked,
                                            formikProps.inputValue
                                        )
                                    }
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
        options: [{ key: 'yes', label: 'Yes', value: { text: 'Yes', valueType: 'String' } }],
        validation: { type: 'none' },
        pii: '',
        className: '',
        required: true,
        enabled: true,
        itemType: 'Checkbox',
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
    validationSchema: (renderProps, id, parentSchema) => {
        return yup.array()
    }
} as DndComponentItem
