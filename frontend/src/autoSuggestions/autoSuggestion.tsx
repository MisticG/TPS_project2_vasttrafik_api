import React from 'react';
import Select from 'react-select';



interface Props {
    getvalue: (data: { value: string, label: string }) => void,
    options:any
}

interface State {
    selectedOption: any
}

export default class AutoSeggestion extends React.Component<Props, State> {
    
    state = {
        selectedOption: null,
    };
    handleChange = ((selected: any) => {
        this.props.getvalue(selected)
    });

    render() {
        console.log(this.props.options)
        const { selectedOption } = this.state;

        return (
            <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={this.props.options}
            />
        );
    }
}