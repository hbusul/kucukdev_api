import React, { Component } from 'react'

class Semester extends Component {

    render() {
        return (
            <div>
                <table class="border-collapse border border-green-800 ...">
                    <thead>
                        <tr>
                            <th class="border border-green-600 ...">State</th>
                            <th class="border border-green-600 ...">City</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-green-600 ...">Indiana</td>
                            <td class="border border-green-600 ...">Indianapolis</td>
                        </tr>
                        <tr>
                            <td class="border border-green-600 ...">Ohio</td>
                            <td class="border border-green-600 ...">Columbus</td>
                        </tr>
                        <tr>
                            <td class="border border-green-600 ...">Michigan</td>
                            <td class="border border-green-600 ...">Detroit</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }

}
export default Semester;