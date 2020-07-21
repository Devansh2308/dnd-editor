import { MenuItem } from '@material-ui/core'
import React from 'react'
import Input, { InputProps } from './Input'

export type DropdownOption =
    | string
    | {
          label: React.ReactNode
          id: string | number
          style?: React.CSSProperties
      }
export interface DropdownProps extends InputProps {
    options: DropdownOption[]
}

const Dropdown: React.FC<DropdownProps> = ({ options = [], ...props }) => {
    const children = React.useMemo(() => {
        return options?.map((option, i) => {
            const opt =
                typeof option === 'string' ? { label: option, id: option, style: {} } : option
            return (
                <MenuItem dense key={i} value={opt.id} style={opt.style}>
                    {opt.label}
                </MenuItem>
            )
        })
    }, [options])
    return (
        <Input select {...props}>
            {children}
        </Input>
    )
}

export default Dropdown
