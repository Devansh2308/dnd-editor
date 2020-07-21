import { Trans } from '@lingui/macro'
import { merge } from 'lodash-es'
import React from 'react'
import { DndBlockItem } from '../../../types'
import Button from '../../components/Button'

export default {
    id: 'circularButton',
    label: <Trans>Circular Button</Trans>,
    render: (renderProps) => (
        <>
            {Button.render(renderProps, 'button-1')} {Button.render(renderProps, 'button-2')}
        </>
    ),
    export: (renderProps) => Button.export(renderProps, 'button-1'),
    image:
        'data:image/png;base64,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',
    initialValues: {
        'button-1': merge({}, Button.initialValues, {
            label: 'Circular Button',
            style: {
                content: {
                    borderRadius: '32px'
                }
            }
        }),
        'button-2': merge({}, Button.initialValues, {
            label: 'Circular Button',
            style: {
                content: {
                    borderRadius: '32px'
                }
            }
        })
    },
    parent: 'button',
    settings: [
        {
            id: 'button-1',
            label: <Trans>Circular Button - 1</Trans>,
            type: 'button',
            settings: Button.settings
        },
        {
            id: 'button-2',
            label: <Trans>Circular Button - 2</Trans>,
            type: 'button',
            settings: Button.settings
        }
    ],
    type: 'block'
} as DndBlockItem
