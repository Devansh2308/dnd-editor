import { Trans } from '@lingui/macro'
import { merge } from 'lodash-es'
import React from 'react'
import { DndBlockItem } from '../../../types'
import Button from '../../components/Button'

export default {
    id: 'sharpButtonFullWidth',
    label: <Trans>Sharp Button (Full Width)</Trans>,
    export: (renderProps) => Button.export(renderProps, 'button-1'),
    render: (renderProps) => Button.render(renderProps, 'button-1'),
    image:
        'data:image/png;base64,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',
    initialValues: {
        'button-1': merge({}, Button.initialValues, {
            label: 'Sharp Button',
            style: {
                content: {
                    borderRadius: '0px',
                    width: '100%'
                }
            }
        })
    },
    parent: 'button',
    settings: [
        {
            id: 'button-1',
            label: <Trans>Sharp Button (Full Width) - 1</Trans>,
            type: 'button',
            settings: Button.settings
        }
    ],
    type: 'block'
} as DndBlockItem
