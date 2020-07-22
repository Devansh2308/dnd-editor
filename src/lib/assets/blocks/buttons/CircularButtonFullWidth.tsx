import { Trans } from '@lingui/macro'
import { merge } from 'lodash-es'
import React from 'react'
import { DndBlockItem } from '../../../types'
import Button from '../../components/Button'

export default {
    id: 'circularButtonFullWidth',
    label: <Trans>Circular Button (Full Width)</Trans>,
    export: (renderProps) => Button.export(renderProps, 'button-1'),
    render: (renderProps) => Button.render(renderProps, 'button-1'),
    image:
        'data:image/png;base64,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',
    initialValues: {
        'button-1': merge({}, Button.initialValues, {
            label: 'Circular Button',
            style: {
                borderRadius: '50px',
                width: '100%'
            }
        })
    },
    parent: 'button',
    settings: [
        {
            id: 'button-1',
            label: <Trans>Circular Button (Full Width) - 1</Trans>,
            type: 'button',
            settings: Button.settings
        }
    ],
    type: 'block'
} as DndBlockItem
